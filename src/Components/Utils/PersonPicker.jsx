import Person1 from '../../Assets/img/person1.png';
import Person2 from '../../Assets/img/person2.png';
import Person3 from '../../Assets/img/person3.png';
import Person4 from '../../Assets/img/person4.png';
import Person5 from '../../Assets/img/person5.png';
import Person6 from '../../Assets/img/person6.png';

let personArray = [Person1, Person2, Person3, Person4, Person5, Person6];

export function randomPerson() {
    // Generate a random index between 0 and the length of the array - 1
    const randomNumber = Math.floor(Math.random() * personArray.length);
    return personArray[randomNumber];
}