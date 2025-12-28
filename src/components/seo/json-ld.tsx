type JsonLdShape = Record<string, unknown>;
type JsonLdInput =
  | JsonLdShape
  | JsonLdShape[]
  | (JsonLdShape | null | undefined)[]
  | null
  | undefined;

const isJsonLdShape = (
  entry: JsonLdShape | null | undefined
): entry is JsonLdShape => Boolean(entry);

export function JsonLd({ data }: { data: JsonLdInput }) {
  const cleaned = Array.isArray(data)
    ? data.filter(isJsonLdShape)
    : data;

  // Avoid rendering an empty or null script tag when nothing valid is provided
  if (!cleaned || (Array.isArray(cleaned) && cleaned.length === 0)) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleaned) }}
    />
  );
}
