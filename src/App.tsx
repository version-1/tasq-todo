import styles from "./App.module.css";

export function App(): React.JSX.Element {
  return (
    <main className={styles.layout}>
      <section className={styles.card} aria-labelledby="page-title">
        <h1 id="page-title" className={styles.title}>
          Todo App
        </h1>
        <p className={styles.description}>Your task list will appear here.</p>
      </section>
    </main>
  );
}
