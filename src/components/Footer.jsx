import downloadIcon from '../assets/img/download.png';

function Footer() {
  return (
    <>
      <div className=" bg-agent h-[200px] lg:pt-4 w-full mt-10 absolute  ">
        {' '}
        <a
          href="https://playvalorant.com/en-us/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-transparent hidden sm:flex md:flex lg:flex items-center justify-center mt-5">
            <img
              className=" h-[30px] w-[30px]  bg-transparent  opacity-80 mx-4 "
              src={downloadIcon}
            />
            <p
              title="Valorant Download"
              className=" text-center bg-transparent text-[20px] font-semibold tracking-wider  "
            >
              Valorant Download
            </p>
          </div>
        </a>
        <div className="bg-transparent flex items-center justify-center mt-4">
          <div className="w-[50%] lg:w-[30%] items-center bg-transparent">
            <p className="bg-transparent text-[12px]  mt-4">
              © Copyright This Page and Valorant-API. All Rights Reserved
              Valorant-API is a non-official API and not endorsed by Riot Games
              in any way. Riot Games, Valorant, and all associated properties
              are trademarks or registered trademarks of Riot Games, Inc.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
