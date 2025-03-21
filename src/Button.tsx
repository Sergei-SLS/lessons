

type titleButtonType = {
    title: string
    onClick?: () => void
    className?: string
}

export const Button = ({ title, onClick, className } : titleButtonType) => {
    return <button className={className} onClick={onClick}>{title}</button>
}