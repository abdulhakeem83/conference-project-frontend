import Styles from '../spinner/Spinner.module.css';
const Spinner = () => (
  <div className={Styles.spinnerPosition}>
  <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
   
  );

export default Spinner;