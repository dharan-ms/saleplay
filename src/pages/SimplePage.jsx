import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SimplePage({ page }) {
  useEffect(() => {
    document.title = `${page.title} | SalePlay`;
  }, [page.title]);

  return (
    <main className="page">
      <div className="wrap">
        <p className="kicker">{page.kicker}</p>
        <h1>{page.title}</h1>
        <p>{page.lede}</p>
        {page.blocks.length > 0 && (
          <div className="teams" style={{ marginTop: 36 }}>
            {page.blocks.map(([title, body, id]) => (
              <article className="team" id={id} key={title}>
                <span>{title}</span>
                <p>{body}</p>
              </article>
            ))}
          </div>
        )}
        <p style={{ marginTop: 36 }}>
          <Link className="btn btn-trial" to="/">Back to homepage</Link>
        </p>
      </div>
    </main>
  );
}
