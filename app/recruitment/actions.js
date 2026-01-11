"use server";
import { writeClient } from "@/lib/sanity/writeClient";

export async function submitApplication(formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const positionId = formData.get("positionId");
    const questionKeysRaw = formData.get("questionKeys");

    if (!questionKeysRaw) {
      throw new Error("Missing form structure data.");
    }

    const questionKeys = JSON.parse(questionKeysRaw);
    const answers = [];

    for (const q of questionKeys) {
      const fieldData = {
        _key: Math.random().toString(36).substring(2, 11),
        question: q.text,
      };

      const value = formData.get(q.text);

      if (q.type === "image upload") {
        if (value && value instanceof File && value.size > 0) {
          try {
            const asset = await writeClient.assets.upload("image", value, {
              filename: value.name,
              contentType: value.type,
            });

            fieldData.imageAnswer = {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: asset._id,
              },
            };
          } catch (uploadError) {
            console.error(
              `Image upload failed for question: ${q.text}`,
              uploadError,
            );
            throw new Error(
              `Failed to upload image for "${q.text}". Please try a smaller file.`,
            );
          }
        }
      } else {
        fieldData.textAnswer = value?.toString() || "";
      }

      answers.push(fieldData);
    }

    await writeClient.create({
      _type: "application",
      name,
      email,
      position: {
        _type: "reference",
        _ref: positionId,
      },
      answers,
      status: "Pending",
    });

    return { success: true };
  } catch (error) {
    console.error("CRITICAL SUBMISSION ERROR:", error);

    return {
      success: false,
      error:
        error.message ||
        "A server error occurred. Please check your connection and try again.",
    };
  }
}
