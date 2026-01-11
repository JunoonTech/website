"use server";

import { writeClient } from "@/lib/sanity/writeClient";

export async function submitApplication(formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const positionId = formData.get("positionId");

    const questionKeys = JSON.parse(formData.get("questionKeys"));

    const answers = await Promise.all(
      questionKeys.map(async (q) => {
        const fieldData = {
          _key: Math.random().toString(36).substring(2),
          question: q.text,
        };

        const value = formData.get(q.text);

        if (q.type === "image upload") {
          if (value && value instanceof File && value.size > 0) {
            const asset = await writeClient.assets.upload("image", value, {
              filename: value.name,
            });
            fieldData.imageAnswer = {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: asset._id,
              },
            };
          }
        } else {
          fieldData.textAnswer = value;
        }

        return fieldData;
      }),
    );

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
    console.error("Submission Error:", error);
    return {
      success: false,
      error:
        error.message || "An error occurred while submitting your application.",
    };
  }
}
