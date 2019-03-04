import faker from 'faker'

export default class TableApi {
    static generateData() {
        const data = []
        const genders = ['Male', 'Female']
        const amount = 5000 + Math.floor(Math.random() * 5000)

        for (let i = 0; i < amount; i++) {
            const gender = faker.random.arrayElement(genders)
            const firstName = faker.name.firstName(gender)
            const lastName = faker.name.lastName(gender)
            const email = faker.internet.email(firstName, lastName)

            data.push({
                id: i + 1,
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: faker.phone.phoneNumber('+1 (###) ###-##-##')
            })
        }

        return data
    }

    static getData(cb) {
        setTimeout(() => {
            cb(TableApi.generateData())
        }, 100);
    }
}