import {
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import router, { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import AuthCheck from "../../components/AuthCheck";
import Loader from "../../components/Loader";
import { getCompanyDetailsToLinkToAdvert } from "../../lib/firebase";
import Creatable from "react-select/creatable";

export default function JobReviewSpec() {
  return (
    <AuthCheck>
      <div id="" className="settings_page min_view">
        <div className="fXgiup block">
          <CompanyDetails />
        </div>
      </div>
    </AuthCheck>
  );
}

function CompanyDetails(props) {
  const router = useRouter();
  const [jobAdvertData, setJobAdvertData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = router.query;
  const s = Array.isArray(slug) ? slug[0] : slug;
  const [error, setError] = useState("");
  const aboutTheCompany = useRef(null);
  const aboutTheRole = useRef(null);
  const employmentType = useRef(null);
  const applicationApplyUrl = useRef(null);
  const jobTitle = useRef(null);
  const visaSponsorship = useRef(null);
  const reviewedToggle = useRef(null);
  const [techStack, setTechStackOptions] = useState([]);
  const [primarySkills, setPrimarySkillsOptions] = useState([]);
  // const [sectors, setSectorsOptions] = useState([]);
  const [jobTitleTags, setJobTitleTagsOptions] = useState([]);
  const [workplaceType, setWorkplaceTypeOptions] = useState([]);
  const [experienceLevel, setExperienceLevelOptions] = useState([]);
  const [companyDetailsArray, setCompanyDetailsArray] = useState([]);
  var companyDetailsMap = null;
  const [companyBenefitsList, setCompanyBenefitsList] = useState([
    { companyBenefits: "" },
  ]);
  const [candidateRequiredSkillsList, setCandidateRequiredSkillsList] =
    useState([{ candidateRequiredSkills: "" }]);
  const [interviewProcessList, setIinterviewProcessList] = useState([
    { interviewProcess: "" },
  ]);

  useEffect(() => {
    const fetchJobAdvertData = async () => {
      setLoading(true);
      try {
        const responseJobAdvert = doc(getFirestore(), "jobAdvert", s);
        const unsubscribe = onSnapshot(responseJobAdvert, async (doc) => {
          setJobAdvertData(doc.data());

          // * - Get company company and display in dropdown
          const com = await getCompanyDetailsToLinkToAdvert();
          com.forEach((value) => {
            // console.log(value.companyName);
            // console.log(value.uid);

            companyDetailsMap = {"value": value.companyName, "label": value.companyName};
            setCompanyDetailsArray(companyDetailsArray => [...companyDetailsArray, companyDetailsMap]);

          });
        });
        setLoading(false);
        return unsubscribe;
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobAdvertData();
  }, [getFirestore(), s]);

  console.log(companyDetailsArray);


  useEffect(() => {
    const docRef = doc(
      getFirestore(),
      "jobAdvertDropdownData",
      "adminJobAdvertDropdown"
    );

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      // console.log({ ...doc.data(), id: doc.id });
      setTechStackOptions(doc.data().techStack);
      setPrimarySkillsOptions(doc.data().primarySkills);
      // setSectorsOptions(doc.data().sectors);
      setJobTitleTagsOptions(doc.data().jobTitleTags);
      setWorkplaceTypeOptions(doc.data().workplaceType);
      setExperienceLevelOptions(doc.data().experienceLevel);
    });
    return () => unsubscribe();
  }, [slug]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const newCompanyDoc = doc(getFirestore(), "companyDetails", s);
    setError("");
    try {
      // console.log("This is the company name: " + companyName.current.value);
      // console.log("this is the check box: " + reviewedToggle.current.checked);
      // console.log(jobData.companySectors);
      // console.log(selected);

      const batch = writeBatch(getFirestore());
      batch.update(newCompanyDoc, {

        aboutTheCompany: aboutTheCompany.current.value,
        aboutTheRole: aboutTheRole.current.value,
        employmentType: employmentType.current.value,
        applicationApplyUrl: applicationApplyUrl.current.value,
        jobTitle: jobTitle.current.value,
        techStack: techStack,
        candidateSkills: primarySkills,
        jobTitleTags: jobTitleTags,
        workplaceType: workplaceType,
        experienceLevel: experienceLevel,
        baseSalary: 0,
        companyBenefits: companyBenefitsList,
        candidateRequiredSkills: candidateRequiredSkillsList,
        interviewProcess: interviewProcessList,
        primarySkills: primarySkills,
        secondarySkills: primarySkills,
        visaSponsorship: visaSponsorship.current.checked,
        reviewed: reviewedToggle.current.checked,
        published: false,
        slug: s,
        companyUid: s,
        // uid: companyDetailsArray, // need the company uid, not name
        addedAt: serverTimestamp(),
      });

      await batch.commit();
    } catch (err) {
      return toast.success("Error updating company details, please try again");
    }
    // router.push("/jobs-review");
    return toast.success("Company details updated");
  };

  // ! Used for companyBenefitsList
  // * handle input change - companyBenefitsList
  const handleInputChangeCompanyBenefitsList = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyBenefitsList];
    list[index][name] = value;
    setCompanyBenefitsList(list);
  };

  // * handle click event of the Remove button - companyBenefitsList
  const handleRemoveClickCompanyBenefitsList = (index) => {
    const list = [...companyBenefitsList];
    list.splice(index, 1);
    setCompanyBenefitsList(list);
  };

  // * handle click event of the Add button - companyBenefitsList
  const handleAddClickCompanyBenefitsList = () => {
    setCompanyBenefitsList([...companyBenefitsList, { companyBenefits: "" }]);
  };

  // ! Used for candidateRequiredSkillsList
  // * handle input change - candidateRequiredSkillsList
  const handleInputChangeCandidateRequiredSkillsList = (e, index) => {
    const { name, value } = e.target;
    const list = [...candidateRequiredSkillsList];
    list[index][name] = value;
    setCandidateRequiredSkillsList(list);
  };

  // * handle click event of the Remove button - candidateRequiredSkillsList
  const handleRemoveClickCandidateRequiredSkillsList = (index) => {
    const list = [...candidateRequiredSkillsList];
    list.splice(index, 1);
    setCandidateRequiredSkillsList(list);
  };

  // * handle click event of the Add button - candidateRequiredSkillsList
  const handleAddClickCandidateRequiredSkillsList = () => {
    setCandidateRequiredSkillsList([
      ...candidateRequiredSkillsList,
      { candidateRequiredSkills: "" },
    ]);
  };

  // ! Used for interviewProcessList
  // * handle input change - interviewProcessList
  const handleInputChangeInterviewProcessList = (e, index) => {
    const { name, value } = e.target;
    const list = [...interviewProcessList];
    list[index][name] = value;
    setIinterviewProcessList(list);
  };

  // * handle click event of the Remove button - interviewProcessList
  const handleRemoveClickInterviewProcessList = (index) => {
    const list = [...interviewProcessList];
    list.splice(index, 1);
    setIinterviewProcessList(list);
  };

  // * handle click event of the Add button - interviewProcessList
  const handleAddClickInterviewProcessList = () => {
    setIinterviewProcessList([
      ...interviewProcessList,
      { interviewProcess: "" },
    ]);
  };

  // console.log(interviewProcessList);
  // console.log(candidateRequiredSkillsList);
  // console.log(companyBenefitsList);



  return (
    <div className="fNgGjC content">
      <h2 className="settings-title block_title">Company Details</h2>
      <div className="eHIaoM">
        <div>
          <form onSubmit={submit}>
            <div className="jBUQajq field">
              <label htmlFor="email" className="gNTSvw question">
                About the company <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <textarea
                  defaultValue={jobAdvertData?.aboutTheCompany}
                  id="aboutCompnay"
                  name="aboutCompnay"
                  className="SDDHw"
                  ref={aboutTheCompany}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="aboutTheRole" className="gNTSvw question">
                About the role <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <textarea
                  id="aboutTheRole"
                  name="aboutTheRole"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.aboutTheRole}
                  ref={aboutTheRole}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="salary" className="gNTSvw question">
                Salary bands <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <input
                  placeholder="From - 50000"
                  id="salary"
                  name="salaryFrom"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.salary}
                  // ref={salary}
                />
              </div>{" "}
              <div className="cqMAuL">
                <input
                  placeholder="To - 100000"
                  id="salary"
                  name="salaryTo"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.salary}
                  // ref={salary}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label
                htmlFor="candidateRequiredSkills"
                className="gNTSvw question"
              >
                Candidate Required Skills{" "}
                <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <div className="cqMAuL">
                  {candidateRequiredSkillsList.map((x, i) => {
                    return (
                      <div className="cqMAuL">
                        <input
                          name="candidateRequiredSkills"
                          placeholder="e.g. You will need an awareness and understanding of TDD"
                          type="text"
                          className="SDDHwDynamicFormInput"
                          value={x.candidateRequiredSkills}
                          onChange={(e) =>
                            handleInputChangeCandidateRequiredSkillsList(e, i)
                          }
                        />
                        <div className="">
                          {candidateRequiredSkillsList.length !== 1 && (
                            <button
                              className="set-btn-remove"
                              onClick={() =>
                                handleRemoveClickCandidateRequiredSkillsList(i)
                              }
                            >
                              -
                            </button>
                          )}
                          {candidateRequiredSkillsList.length - 1 === i && (
                            <button
                              className="set-btn-add"
                              onClick={
                                handleAddClickCandidateRequiredSkillsList
                              }
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="candidateSkills" className="gNTSvw question">
                Candidate Skills <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <Creatable
                  id="candidateSkills"
                  name="candidateSkills"
                  placeholder="Select required candidate skills"
                  options={primarySkills}
                  isMulti
                  noOptionsMessage={() => "name not found"}
                ></Creatable>
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="companyBenefits" className="gNTSvw question">
                Company Benefits <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                {companyBenefitsList.map((x, i) => {
                  return (
                    <div className="cqMAuL">
                      <input
                        name="companyBenefits"
                        placeholder="e.g. Stock Options"
                        type="text"
                        className="SDDHwDynamicFormInput"
                        value={x.companyBenefits}
                        onChange={(e) =>
                          handleInputChangeCompanyBenefitsList(e, i)
                        }
                      />
                      <div className="">
                        {companyBenefitsList.length !== 1 && (
                          <button
                            className="set-btn-remove"
                            onClick={() =>
                              handleRemoveClickCompanyBenefitsList(i)
                            }
                          >
                            -
                          </button>
                        )}
                        {companyBenefitsList.length - 1 === i && (
                          <button
                            className="set-btn-add"
                            onClick={handleAddClickCompanyBenefitsList}
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="employmentType" className="gNTSvw question">
                Employment type
              </label>
              <div className="cqMAuL">
                <input
                  id="employmentType"
                  name="employmentType"
                  type="text"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.employmentType}
                  ref={employmentType}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="experienceLevel" className="gNTSvw question">
                Experience level <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <Creatable
                  id="experienceLevel"
                  name="experienceLevel"
                  placeholder="Select required experience level for candidate"
                  options={experienceLevel}
                  isMulti
                  noOptionsMessage={() => "name not found"}
                ></Creatable>
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="interviewProcess" className="gNTSvw question">
                Interview process <span style={{ color: "red" }}> * </span>
              </label>
              {/* <div className="cqMAuL">
                <textarea
                  id="interviewProcess"
                  name="interviewProcess"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.interviewProcess}
                  ref={interviewProcess}
                />
              </div> */}
              <div className="cqMAuL">
                {interviewProcessList.map((x, i) => {
                  return (
                    <div className="cqMAuL">
                      <input
                        name="interviewProcess"
                        placeholder="e.g. Stock Options"
                        type="text"
                        className="SDDHwDynamicFormInput"
                        value={x.interviewProcess}
                        onChange={(e) =>
                          handleInputChangeInterviewProcessList(e, i)
                        }
                      />
                      <div className="">
                        {interviewProcessList.length !== 1 && (
                          <button
                            className="set-btn-remove"
                            onClick={() =>
                              handleRemoveClickInterviewProcessList(i)
                            }
                          >
                            -
                          </button>
                        )}
                        {interviewProcessList.length - 1 === i && (
                          <button
                            className="set-btn-add"
                            onClick={handleAddClickInterviewProcessList}
                          >+
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="jobTitle" className="gNTSvw question">
                Job title <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.jobTitle}
                  ref={jobTitle}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="jobTitleTags" className="gNTSvw question">
                Job title tags <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <Creatable
                  id="jobTitleTags"
                  name="jobTitleTags"
                  placeholder="Select required experience level for candidate"
                  options={jobTitleTags}
                  isMulti
                  noOptionsMessage={() => "name not found"}
                ></Creatable>
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="primarySkills" className="gNTSvw question">
                Primary Skills <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <Creatable
                  id="primarySkills"
                  name="primarySkills"
                  placeholder="Select required primary skills for candidate"
                  options={primarySkills}
                  isMulti
                  noOptionsMessage={() => "name not found"}
                ></Creatable>
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="workplaceType" className="gNTSvw question">
                Workplace type <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <Creatable
                  id="workplaceType"
                  name="workplaceType"
                  placeholder="Select workplace type - Hybrid / Office"
                  options={workplaceType}
                  isMulti
                  noOptionsMessage={() => "name not found"}
                ></Creatable>
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="techStack" className="gNTSvw question">
                Tech stack <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <Creatable
                  id="techStack"
                  name="techStack"
                  placeholder="Select tech stack used at the company"
                  options={techStack}
                  isMulti
                  noOptionsMessage={() => "name not found"}
                ></Creatable>
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="visaSponsorship" className="gNTSvw question">
                Visa sponsorship <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <input
                  type="checkbox"
                  id="visaSponsorship"
                  defaultChecked={jobAdvertData?.visaSponsorship}
                  ref={visaSponsorship}
                  // required
                  style={{ width: 30 }}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="applicationApplyUrl" className="gNTSvw question">
                Application URL <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <input
                  id="applicationApplyUrl"
                  name="applicationApplyUrl"
                  type="text"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.applicationApplyUrl}
                  ref={applicationApplyUrl}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="companyNameLink" className="gNTSvw question">
                Link to company name <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <Creatable
                  id="companyNameLink"
                  name="companyNameLink"
                  placeholder="Select required experience level for candidate"
                  options={companyDetailsArray}
                  noOptionsMessage={() => "Company not found"}
                ></Creatable>
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="reviewedCheckbox" className="gNTSvw question">
                Role Reviewed <span style={{ color: "red" }}> * </span>
              </label>
              <div className="cqMAuL">
                <input
                  type="checkbox"
                  id="reviewedCheckbox"
                  defaultChecked={jobAdvertData?.reviewed}
                  ref={reviewedToggle}
                  // required
                  style={{ width: 30 }}
                />
              </div>
            </div>

            <button type="submit" value="submit" className="set-btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
