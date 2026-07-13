import styles from './App.module.css'

export function App() {
  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="page-title">
        <h1 id="page-title" className={styles.title}>
          Tasq Todo
        </h1>
        <p className={styles.description}>Your todo list will appear here.</p>
      </section>
    </main>
  )
}
