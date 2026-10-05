// The 27 shards of Kimi Linear 48B, one bar per layer. Bar height is the GPU
// memory that shard needs, to scale (first stage 33%, KDA 58%, token-scaled 93%,
// terminal 100% of the largest).
const TOKEN_SCALED = new Set([3, 7, 11, 15, 19, 23]);
const LABELLED = new Set([0, 3, 7, 11, 15, 19, 23, 26]);

function shardClass(layer: number): string {
  if (layer === 0) return "first";
  if (layer === 26) return "terminal";
  return TOKEN_SCALED.has(layer) ? "token" : "kda";
}

export function ShardStrip({ highlight = 5, caption = true }: { highlight?: number | null; caption?: boolean }) {
  const layers = Array.from({ length: 27 }, (_, layer) => layer);
  return (
    <figure className="shard-strip">
      <div className="shard-bars" role="img" aria-label="Kimi Linear 48B split into 27 shards. Six attention layers and the last layer need the most memory.">
        {layers.map((layer) => (
          <span key={layer} className={`shard-bar ${shardClass(layer)}${layer === highlight ? " yours" : ""}`} />
        ))}
      </div>
      <div className="shard-axis" aria-hidden="true">
        {layers.map((layer) => (
          <span key={layer} className={layer === highlight ? "yours" : undefined}>
            {LABELLED.has(layer) || layer === highlight ? layer : ""}
          </span>
        ))}
      </div>
      {caption ? (
        <figcaption>
          <span>Bar height = GPU memory the shard needs</span>
          {highlight != null ? <span><b aria-hidden="true">■</b> One machine hosts one shard</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
