import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-start">
      <section>
        <h2 className="text-3xl font-bold mb-4">Welcome to the Portfolio</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Performance-first architecture</li>
          <li>Accessible by default</li>
          <li>Responsive design</li>
        </ul>
      </section>

      <section className="p-6 border border-dashed border-gray-400 rounded-lg w-full">
        <h3 className="text-sm font-uppercase text-gray-500 mb-2">Detailed View Stub</h3>
        <p>[ Viewer Mode Switcher Placeholder ]</p>
      </section>
    </div>
  );
}
