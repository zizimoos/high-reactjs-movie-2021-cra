import styles from "./Button.module.css"

export default function Button({text}){
    return (
        <button className={styles.btn}>{text}</button>
    )
}

