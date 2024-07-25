import Input from './Input';
// import styles from '../../../styles/account/profile-tab/BasicDetails.module.css';

export default function BasicDetails() {
    return(
        <fieldset className="rounded-lg p-5 bg-[#FAFAFA] flex flex-col justify-center gap-3">
            <Input type='text' label="First name*" name='firstName' placeholder='e.g. John' required/>
            <Input type='text' label="Last name*" name='lastName' placeholder='e.g. Appleseed' required/>
            <Input type='email' label="Email" name='email' placeholder='e.g. email@example.com' required/>
        </fieldset>
    )
}