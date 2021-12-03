interface Accounts {
    create: {(): void}
}

const create = () => {
    console.log(this)
}

const accounts = {
    create
}

export {
    accounts,
    Accounts
}