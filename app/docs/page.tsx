"use client";

import { useState } from "react";

export default function EmbedDocsPage() {
  const [url] = useState(
    "https://door-3d-configurator.vercel.app/paultec_alba/embed_alba_iframe",
  );

  const iframeCode = `<iframe id="door-configurator" src="${url}" width="100%" height="600"></iframe>`;
  const scriptCode = `<script src="https://yourdomain.com/door-embed.js"></script>`;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto p-8 space-y-10">
        <h1 className="text-3xl font-bold">Door Configurator Embed</h1>

        {/* Step 1 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">1. Add iframe</h2>
          <pre className="bg-white border border-gray-200 p-4 rounded-lg text-sm overflow-x-auto">
            {iframeCode}
          </pre>
        </section>

        {/* Step 2 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">2. Add script</h2>
          <pre className="bg-white border border-gray-200 p-4 rounded-lg text-sm overflow-x-auto">
            {scriptCode}
          </pre>
        </section>

        {/* Step 3 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">3. Connect inputs</h2>
          <pre className="bg-white border border-gray-200 p-4 rounded-lg text-sm overflow-x-auto">
            {`<input type="number" data-door="width" />
<input type="number" data-door="height" />

<select data-door="verglasung">
  <option value="klar">Klar</option>
  <option value="milch">Milch</option>
</select>`}
          </pre>
        </section>

        {/* Preview */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Live Preview</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <iframe src={url} className="w-full h-[500px]" />
          </div>
        </section>
      </div>
    </div>
  );
}
