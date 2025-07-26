import Head from 'next/head';
import KanbanBoard from '../components/KanbanBoard';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Sensor Orders Dashboard</title>
      </Head>
      <main className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
        <KanbanBoard />
      </main>
    </>
  );
}
