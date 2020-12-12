import Link from "next/link";

export default function FirstPost() {
  const notes = new Array(15)
    .fill(1)
    .map((e, i) => ({ id: i, title: `Note: ${i}` }));
  return (
    <div>
      <h1 className="font-bold text-xl text-red-800">First Post</h1>
      {notes.map((note) => (
        <div key={note.id}>
          <Link href="/notes/[id]" as={`/notes/${note.id}`}>
            <a>
              <strong>{note.title}</strong>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
