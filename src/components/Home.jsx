import React from "react";
import shortid from "shortid";
import HomePic from "../assests/homePage.jpg";
import Product from "./Product";
import Image1 from "../assests/products/1.png";
import Image2 from "../assests/products/2.png";
import Image3 from "../assests/products/3.png";
import Image4 from "../assests/products/4.png";
import Image5 from "../assests/products/5.png";
import Image6 from "../assests/products/6.png";

const Home = () => {
  return (
    <div className="w-full flex items-center flex-col px-6 bg-gray-200 overflow-hidden">
      <img src={HomePic} alt="..." className="HomeImage w-full" />

      <div className="mt-[-100px] w-full space-y-4">
        <div className="flex items-center justify-between flex-wrap w-full min-[695px]:space-x-8 ">
          <Product
            id={shortid.generate()}
            title="Razer Kraken Tournament Edition THX 7.1 Surround Sound Gaming Headset: Retractable Noise Cancelling Mic - USB DAC - For PC, PS4, PS5, Nintendo Switch, Xbox One, Xbox Series X & S, Mobile – Black"
            rating={5}
            price={499}
            image={Image1}
          />
          <Product
            id={shortid.generate()}
            title="Lenovo - 2021 - IdeaPad 3 - Gaming Laptop - AMD Ryzen 5 5600H - 8GB RAM - 256GB Storage - NVIDIA GeForce GTX 1650-15.6 FHD Display - Windows 11 Home"
            rating={5}
            price={268}
            image={Image2}
          />
        </div>
        <div className="flex items-center justify-between flex-wrap w-full min-[695px]:space-x-8 ">
          <Product
            id={shortid.generate()}
            title="Fujitsu ScanSnap iX1600 Wireless or USB High-Speed Cloud Enabled Document, Photo & Receipt Scanner with Large Touchscreen and Auto Document Feeder for Mac or PC, White"
            rating={4}
            price={1080}
            image={Image3}
          />
          <Product
            id={shortid.generate()}
            title="
             
            Meta Quest 2 — Advanced All-In-One Virtual Reality Headset — 128 GB"
            rating={3}
            price={352}
            image={Image4}
          />
          <Product
            id={shortid.generate()}
            title="MeLE PCG02 Fanless Mini PC Stick Windows 11 Pro J4125 8GB/128GB Portable Mini Desktop Computer Stick Business & Home Video Support HDMI 4K 60Hz, BT4.2, 2.4G/5.8G Dual Band Wi-Fi, USB, Ethernet..."
            rating={5}
            price={600}
            image={Image5}
          />
        </div>
        <div className="flex items-center justify-between flex-wrap w-full min-[695px]:space-x-8  ">
          <Product
            id={shortid.generate()}
            title="SAMSUNG Galaxy S22 Ultra Cell Phone, Factory Unlocked Android Smartphone, 128GB, 8K Camera & Video, Brightest Display Screen, S Pen, Long Battery Life, Fast 4nm Processor, US Version, Phantom Black"
            rating={4}
            price={999}
            image={Image6}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
