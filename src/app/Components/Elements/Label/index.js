export const Label = (props) => {
  const { children } = props;
  return (
    <label className="mr-2 lg:mr-2 bg-slate-200 p-1 lg:p-2 rounded-full text-black">
      {children}
    </label>
  );
};
