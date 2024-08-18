"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Carousel = ({ children }) => {
  const mappedItems = useMemo(
    () => children.map((child, idx) => ({ component: child, id: idx })),
    [children],
  );

  const [items, setItems] = useState(mappedItems);

  useEffect(() => {
    setItems(mappedItems);
  }, [mappedItems]);

  const onPrev = () => {
    const newItems = [...items];
    const last = newItems[newItems.length - 1];
    newItems.unshift({ ...last, id: newItems[0].id - 1 });

    setItems(newItems);

    setTimeout(() => {
      setItems(newItems.slice(0, newItems.length - 1));
    }, 10);
  };

  const onNext = () => {
    setItems((items) => {
      const newItems = [...items];
      const first = newItems.shift();
      first.id = newItems[newItems.length - 1].id + 1;
      newItems.push(first);
      return newItems;
    });
  };

  return (
    <div className="flex items-center gap-6">
      <button onClick={onPrev}>
        <FaArrowCircleLeft className="size-6" />
      </button>
      <div className="flex grow gap-6 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item) => (
            <motion.div
              layout
              key={`item-${item.id}`}
              exit={{ opacity: 0, scale: 0.5 }}
              className="shrink-0"
            >
              {item.component}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button onClick={onNext}>
        <FaArrowCircleRight className="size-6" />
      </button>
    </div>
  );
};

export default Carousel;
