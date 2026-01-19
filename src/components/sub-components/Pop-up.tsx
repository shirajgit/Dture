type LoadingProps = {
  open: boolean;
  text?: string;
};

const Loading = ({ open, text = "Loading..." }: LoadingProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Loader Box */}
      <div className="relative z-10 flex flex-col items-center gap-4 rounded-2xl bg-zinc-900 px-8 py-6 shadow-2xl">
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-green-500" />

        {/* Text */}
        <p className="text-sm font-medium text-zinc-300">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Loading;
