// Navy field with a bright-blue bloom rising from the bottom centre, per the
// reference: near-solid --brand-blue-bright along the bottom edge, washing out to
// bare --brand-blue by roughly the vertical midpoint.
//
// Two layers rather than one. The radial alone can't do it — pushing its core
// bright enough to read at the bottom edge also makes it read as a distinct
// circle, since the corners fall off much faster than the centre. So a linear
// lifts the whole bottom band evenly (that's what carries the edge colour into
// the corners) and the radial only adds the centre hotspot on top of it.
//
// The stops are rgba literals rather than --brand-* tokens by necessity: the
// tokens are literal hex, so there is no channel syntax to interpolate an alpha
// into (see the note in globals.css). rgba(30,195,255) is --brand-blue-bright
// and rgba(0,26,120) is --brand-blue; keep them in step by hand.
//
// Container contract: the parent must be `relative isolate overflow-hidden` over
// a bg-brand-blue base. Every stop fades to fully transparent, so these layers
// only ever add light — they never paint a colour of their own.
export function BrandBloom() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 75% 45% at 50% 104%, rgba(30,195,255,0.85) 0%, rgba(30,150,255,0.45) 45%, rgba(30,150,255,0) 75%)",
          "linear-gradient(to top, rgba(23,120,240,0.95) 0%, rgba(18,80,205,0.55) 22%, rgba(10,50,165,0.22) 42%, rgba(0,26,120,0) 62%)",
        ].join(", "),
      }}
    />
  );
}
