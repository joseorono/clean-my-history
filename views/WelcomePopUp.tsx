export default function WelcomePopUp() {
  return (
    <>
      <div
        id="popup-top"
        className="flex items-center justify-between p-4 bg-[rgb(25,118,210)] text-white">
        <h2 className="text-xl font-bold">
          Welcome to{" "}
          <a href="https://www.plasmo.com" target="_blank">
            FocusSpace
          </a>
          !
        </h2>
      </div>
    </>
  );
}
