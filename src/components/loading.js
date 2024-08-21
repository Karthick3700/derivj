const GlobalLoading = () => {
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center">
      <div className="w-20 h-20 border-4 border-transparent animate-spin flex items-center justify-center rounded-full dark:border-t-white border-t-[#000]">
        <div className="w-16 h-16 border-4 border-transparent animate-spin flex items-center justify-center rounded-full border-t-[#ff0000]"></div>
      </div>
    </div>
  );
};

export default GlobalLoading;
