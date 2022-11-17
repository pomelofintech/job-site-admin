import { doc, getFirestore, onSnapshot, writeBatch } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AuthCheck from "../../components/AuthCheck";
import Loader from "../../components/Loader";

export default function CompanyDetails(props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");


  const getLocalData = async (regUsr) => {

    if (localStorage) {
      let stickyValue = window.localStorage.getItem("user");
      stickyValue = JSON.parse(stickyValue);

      const userDoc = doc(getFirestore(), "users", regUsr, "job-preferences", regUsr);
      setError("");
      try {
        const batch = writeBatch(getFirestore());
        batch.set(userDoc, {
          roleType: stickyValue['roleType'],
          sector: stickyValue['sector'],
          companyQuality: stickyValue['companyQuality'],
          perks: stickyValue['perks'],
          comapnySize: stickyValue['comapnySize'],
          experience: stickyValue['experience'],
          workingStyle: stickyValue['workingStyle'],
          companyCulture:stickyValue['companyCulture'] ,
          roles: stickyValue['roles'],
          technologies: stickyValue['technologies'],
          searchStage: stickyValue['searchStage'],
          newTechnologies: stickyValue['newTechnologies'],
          leavingRole: stickyValue['leavingRole'],
          visa: Boolean(stickyValue['visa']),
          describeYou: stickyValue['describeYou'],
        });
    
        await batch.commit();
      } catch (err) {
          return err;
      }
      return '200';
    };

  }

  return (
    <div id="" className="settings_page min_view">
    <div className="fXgiup block">
    <div className="fNgGjC content">
      <h2 className="settings-title block_title">Company Details</h2>
      <div className="eHIaoM">
        <div>
          <form onSubmit={null}>
            <div className="jBUQajq field">
              <label htmlFor="email" className="gNTSvw question">
                Background Image URL - Upload image to firebase storage manaually
              </label>
              <div className="cqMAuL">
                <input
                  // defaultValue={doc.email}
                  id="email"
                  name="email"
                  type="text"
                  className="SDDHw"
                  value={props.jobData?.jobTitle}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="firstName" className="gNTSvw question">
                Company Name
              </label>
              <div className="cqMAuL">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="SDDHw"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Company Mission
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Website URL
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Twitter URL
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Instagram URL
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Facebook URL
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Linkedin URL
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Compant Logo URL - manaually upload to firebase storage
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Company Sectors
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Address Ln1
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                  Address Ln2
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                City
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Post code
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Reviewed
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <p>Need to add the following to firebase when save</p>
            <p>slug - based on company name</p>
            <p>uid - based on document ID</p>
            <p>addedAt - based on date and time added to firebase</p>
            <p>companyCreation - set to true, ALWAYS</p>

            <button type="submit" className="set-btn">
              Save
            </button>
          </form>
        </div>
        <p>{error}</p>
      </div>
    </div>
    </div>
    </div>
  );
}
