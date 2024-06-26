
import style from '../../css/PatientAddingForm.module.css'

import OverlayModel from "../../../../../utility/OverlayModel"
import PatientFormContactSection from './PatientFormContactSection'
import PatientFormPlaceSection from './PatientFormPlaceSection'
import PatientFormChildrenSection from './PatientFormChildrenSection'
import { AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { SetPatientInput } from '../../../../../../context/slices/AddPatientForm'
const PatientForm = ({changeFormMode,childrenList=[],RemoveChildrenFromList,AddNewPatient,PatientInputs,formIsValid,onFormClose}) => {
    const dispach = useDispatch()

    const SetPatientInputHandler = ({inputId,inputObject}) => {
        dispach(SetPatientInput({inputId,inputObject}))
    }

    const FormSubmitHandler = (event) => {
        event.preventDefault();

        if(!formIsValid){
            return;
        }

        if(childrenList.length === 0){
            changeFormMode("childrenWarning")
            return;
        }
        
        AddNewPatient()
    }

    return (
        <OverlayModel title='Dodaj pacjenta' OnQuitButtonClick={onFormClose} >
            <form className={style.PatientAddingForm}>
                <PatientFormContactSection setPatientInput={SetPatientInputHandler} patientInputs={PatientInputs}/>
                <PatientFormPlaceSection setPatientInput={SetPatientInputHandler} FormSubmit={FormSubmitHandler} formIsValid={formIsValid} patientInputs={PatientInputs} />
                <PatientFormChildrenSection>
                    <AnimatePresence>
                        {childrenList.map((children)=>(
                            <PatientFormChildrenSection.ChildrenElement key={children.id} childrenDetails={children} RemoveChildrenFromList={RemoveChildrenFromList}/>
                        ))}
                    </AnimatePresence>
                    <PatientFormChildrenSection.ChildrenElement setChildrenFormMode={changeFormMode}/>
                </PatientFormChildrenSection>
            </form>
        </OverlayModel>
    )
}

export default PatientForm