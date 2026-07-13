export default function AnimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No header, footer, or dock — bare layout for the animation experience
  return <>{children}</>;
}
