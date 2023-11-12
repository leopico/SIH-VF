import classes from "./ChangeMapType.module.css";

const ChangeMapType = (props) => {
  const { handleMapToggle } = props;
  return (
    <>
      <div className={classes.changeMapTypeContainer}>
        <img
          className={classes.containerToggle}
          src="/map/layers/MaskGroup.png"
          alt="Map toggle"
          onClick={handleMapToggle}
        />
      </div>
    </>
  );
};

export default ChangeMapType;
