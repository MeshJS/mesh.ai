export default function Drawer({
  children,
  showDrawer,
  maxSize = "max-w-3xl",
}) {
  return (
    <div
      className={`fixed top-16 right-0 z-10 w-full h-screen ${maxSize} p-4 overflow-y-auto border-gray-200 border dark:border-gray-700 bg-white/80 backdrop-blur dark:bg-gray-800/80 transition-transform ${
        !showDrawer && "translate-x-full"
      }`}
    >
      {children}
    </div>
  );
}
