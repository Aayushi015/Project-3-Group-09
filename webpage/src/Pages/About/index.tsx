import chaseImage from "../../assets/Images/Chase.jpg"
import yoshiImage from "../../assets/Images/Yoshi.jpg"
import kritiImage from "../../assets/Images/Kriti.jpg"


// Team Member Component
const TeamMember = ({ name, role, image, linkedin, github }: {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  github?: string;
}) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg">
      <img src={image} alt={name} className="w-24 h-24 rounded-full object-cover mb-3" />
      <h4 className="text-lg font-semibold">{name}</h4>
      <p className="text-sm text-gray-600">{role}</p>
      <div className="flex mt-2 space-x-2">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            LinkedIn
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};
// About Us Page
const About = () => {
  const team = [
    {
      name: "Leonardo Rodrigues",
      role: "Lead Back End Developer",
      image: "https://via.placeholder.com/150",
      linkedin: "",
      github: "https://github.com/Leonardojrr",
    },
    {
      name: "Kriti Kharti",
      role: "Data Scientist",
      image: kritiImage,
      linkedin: "https://www.linkedin.com/in/kriti-khatri-1b621958/",
      github: "https://github.com/Cretikc",
    },
    {
      name: "Aayushi Patel",
      role: "Data Scientist",
      image: yoshiImage,
      linkedin: "",
      github: "https://github.com/Aayushi015",
    },
    {
      name: "Chase Mueller",
      role: "Front End Engineer / Project Manager",
      image: chaseImage,
      linkedin: "https://www.linkedin.com/in/chase-mueller",
      github: "https://github.com/CJMX95",
    },
  ];
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white text-center py-6">
        <h1 className="text-3xl font-bold">About Our Team</h1>
        <p className="text-lg">Meet the passionate developers behind Earthquake Data App</p>
      </header>
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
