export default function Auth({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>header</div>
      {children}
      <div>footer</div>
    </div>
  );
}
