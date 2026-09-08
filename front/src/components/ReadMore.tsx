import { useState } from "react";

export default function ReadMore({ children, maxWords = 191 }: { children: React.ReactNode, maxWords?: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // نحول children إلى نص لاستخراج الكلمات
    const getText = (node: any): string => {
        if (typeof node === "string") return node;
        if (Array.isArray(node)) return node.map(getText).join("");
        if (node?.props?.children) return getText(node.props.children);
        return "";
    };

    const fullText = getText(children);
    const words = fullText.split(" ");
    const isLong = words.length > maxWords;

    const shortText = words.slice(0, maxWords).join(" ");

    return (
        <div className="inline text-brand-black leading-loose text-justify">
            {isExpanded || !isLong ? (
                children
            ) : (
                <span>{shortText} ... </span>
            )}

            {isLong && (
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-block mr-2 font-bold text-brand-red hover:text-brand-gold transition-colors duration-300 cursor-pointer focus:outline-none"
                >
                    {isExpanded ? " قراءة أقل" : " قراءة المزيد..."}
                </button>
            )}
        </div>
    );
}