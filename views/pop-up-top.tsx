import ThemeSwitcher from "../components/theme-switcher";


export default function PopUpTop() {
  return (
    <>
      <div
        id="popup-top"
        className="flex items-center justify-between bg-[rgb(25,118,210)] px-4 py-2 text-white">
        <h2 className="text-lg font-bold">Welcome to FocusSpace</h2>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
}