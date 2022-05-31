import Head from 'next/head';
import Image from 'next/image';
import { Button, Table } from '@nextui-org/react';
import styles from '@pages/index.module.css';

import { TradingViewChart, OrderForm } from '@components/index';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          <a href="https://github.com/tradingview/charting_library/">
            Trading View Charting
          </a>{' '}
          with <a href="https://nextjs.org">Next.js</a>
        </h1>
        <div className="flex-row">
          <div>
            <OrderForm />
            <Button color="success" auto>
              Buy
            </Button>
            <Button color="error" auto>
              Sell
            </Button>
          </div>
          <div>
            <Table aria-label="Example table with static content">
              <Table.Header>
                <Table.Column>Price</Table.Column>
                <Table.Column>Quantity</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row key="1">
                  <Table.Cell>123</Table.Cell>
                  <Table.Cell>123</Table.Cell>
                </Table.Row>
                <Table.Row key="1">
                  <Table.Cell>123</Table.Cell>
                  <Table.Cell>123</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
        <TradingViewChart />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
