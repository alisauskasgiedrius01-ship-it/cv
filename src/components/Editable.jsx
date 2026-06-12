import { useContent } from "../content/ContentContext";

// Renders a normal element in view mode. In admin mode it adds the
// outline + tooltip that "marks" the text as editable, and tags it
// with the field path so clicking opens the panel on that field.
export function Editable({
  as: Tag = "span",
  editKey,
  label,
  className = "",
  children,
  ...rest
}) {
  const { admin, highlight, activeKey } = useContent();

  if (!(admin && highlight)) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const active = activeKey === editKey;
  return (
    <Tag
      className={`${className} ed-mark${active ? " ed-mark--active" : ""}`.trim()}
      data-edit-key={editKey}
      title={label ? `Redaguoti: ${label}` : "Redaguoti tekstą"}
      {...rest}
    >
      {children}
    </Tag>
  );
}
