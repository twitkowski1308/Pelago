type Dependent = {
    name: string;
    age: number;
    added: Date;
};

type Patient = {
    name: string;
    age: number;
    dependents: Dependent[];
};

// 1. Function to return the dependent which was added most recently
function getMostRecentlyAddedDependent(patient: Patient): Dependent | undefined {
    const dependents = patient.dependents;
    if (dependents.length === 0) {
        return undefined;
    }

    return dependents.reduce((latestDependent, currentDependent) =>
        currentDependent.added > latestDependent.added ? currentDependent : latestDependent
    );
}

// 2. Function to return the last adult dependent added (older than 18)
function getLastAdultDependent(patient: Patient): Dependent | undefined {
    const adultDependents = patient.dependents.filter((dependent) => dependent.age > 18);
    if (adultDependents.length === 0) {
        return undefined;
    }

    return adultDependents[adultDependents.length - 1];
}

// 3. Function to produce a report for under-age dependents


function produceUnderAgeDependentsReport(patients: Patient[]): void {
    patients.forEach((patient) => {
        const underAgeDependents = patient.dependents.filter((dependent) => dependent.age < 18);

        if (underAgeDependents.length > 0) {
            const patientNameParts = patient.name.split(' ');
            const lastName = patientNameParts[1]; // assuming the last name is the second part
            const firstName = patientNameParts[0];

            const dependentsString = underAgeDependents
                .map((dependent) => `${dependent.name.split(' ')[0]}(${dependent.age})`)
                .join(', ');

            console.log(`${lastName}, ${firstName} - ${dependentsString}`);
        }
    });
}

// 4. Tests
const patientA = {
    name: "John Smith",
    age: 37,
    dependents: [
        { name: "Jane Smith", age: 36, added: new Date("2019-01-16") },
        { name: "Joe Smith", age: 12, added: new Date("2019-01-16") },
        { name: "Sally Smith", age: 10, added: new Date("2020-10-12") },
    ],
};

const patientB = {
    name: "John Doe",
    age: 45,
    dependents: [
        { name: "Jane Doe", age: 22, added: new Date("2022-01-01") },
        { name: "Jack Doe", age: 16, added: new Date("2022-01-02") },
        { name: "Jill Doe", age: 10, added: new Date("2022-01-03") },
    ],
};


console.log(getMostRecentlyAddedDependent(patientA)); // Test 1
console.log(getMostRecentlyAddedDependent(patientB)); // Test 2
console.log(getLastAdultDependent(patientA)); // Test 3
console.log(getLastAdultDependent(patientB)); // Test 4

const testPatients = [patientA, patientB];
produceUnderAgeDependentsReport(testPatients); // Test 5
