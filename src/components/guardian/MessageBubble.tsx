export function MessageBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end" role="group" aria-label="Your message">
      <p className="max-w-[85%] rounded-[22px] rounded-br-lg bg-bw-primary px-4 py-3 text-[15px] leading-relaxed text-white shadow-bw">
        {text}
      </p>
    </div>
  );
}
