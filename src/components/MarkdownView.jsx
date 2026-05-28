const normalizeText = (text) => text.replace(/\r\n/g, "\n");

const MarkdownView = ({ content }) => {
    const lines = normalizeText(content).split("\n");
    const blocks = [];
    let currentList = null;

    lines.forEach((line) => {
        const trimmed = line.trim();

        if (!trimmed) {
            if (currentList) {
                blocks.push(currentList);
                currentList = null;
            }
            return;
        }

        if (trimmed.startsWith("# ")) {
            if (currentList) {
                blocks.push(currentList);
                currentList = null;
            }
            blocks.push({ type: "h2", value: trimmed.slice(2) });
            return;
        }

        if (trimmed.startsWith("## ")) {
            if (currentList) {
                blocks.push(currentList);
                currentList = null;
            }
            blocks.push({ type: "h3", value: trimmed.slice(3) });
            return;
        }

        if (trimmed.startsWith("- ")) {
            if (!currentList) {
                currentList = { type: "list", items: [] };
            }
            currentList.items.push(trimmed.slice(2));
            return;
        }

        if (currentList) {
            blocks.push(currentList);
            currentList = null;
        }

        blocks.push({ type: "paragraph", value: trimmed });
    });

    if (currentList) {
        blocks.push(currentList);
    }

    return (
        <div className="markdown-view">
            {blocks.map((block, index) => {
                if (block.type === "h2") {
                    return <h2 key={index}>{block.value}</h2>;
                }
                if (block.type === "h3") {
                    return <h3 key={index}>{block.value}</h3>;
                }
                if (block.type === "list") {
                    return (
                        <ul key={index}>
                            {block.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    );
                }
                return (
                    <p key={index} className="markdown-paragraph">
                        {block.value}
                    </p>
                );
            })}
        </div>
    );
};

export default MarkdownView;
