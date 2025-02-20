export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div data-testid="loader" className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
    </div>
  );
}
