const MyFooter = function () {
  return (
    <div
      className=" text-light text-center mt-5"
      style={{
        background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
      }}
    >
      <p className="py-3 m-0">
        MY WHEATHER APP - {new Date().toLocaleDateString("it-IT")}
      </p>
    </div>
  );
};

export default MyFooter;
