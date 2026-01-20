type LoadingProps = {
  open: boolean;
  text?: string;
};

const Loading = ({ open, text = "Analyzing debate..." }: LoadingProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Glow Ring */}
      <div className="relative z-10 rounded-3xl p-[2px]
        bg-gradient-to-br from-green-400 via-emerald-500 to-green-400
        shadow-[0_0_40px_rgba(34,197,94,0.6)]
      ">
        {/* Loader Box */}
        <div className="
          flex flex-col items-center gap-4
          rounded-3xl bg-zinc-900/90
          px-10 py-8
          backdrop-blur-xl
        ">

          {/* Spinner */}
          <div className="relative h-14 w-14">
            <div className="
              absolute inset-0
              rounded-full
              border-4 border-green-500/20
            " />
            <div className="
              absolute inset-0
              rounded-full
              border-4 border-transparent
              border-t-green-400
              animate-spin
            " />
          </div>

          {/* Text */}
          <p className="
            text-sm font-semibold tracking-wide
            text-green-400  
          ">
            {text}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Loading;
