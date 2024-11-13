import Link from 'next/link';

export default function TabNavigation() {
  return (
    <nav className="flex justify-around p-4 bg-gray-100">
      <Link href="/staking">Staking</Link>
      <Link href="/transactions">Transactions</Link>
      <Link href="/calculator">Calculator</Link>
      <Link href="/faq">FAQ</Link>
    </nav>
  );
}
