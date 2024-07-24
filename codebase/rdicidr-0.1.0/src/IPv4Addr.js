import Octet from "./Octet";
import Netmask from "./Netmask";
import SubnetNumbersInput from "./SubnetNumbersInput";
import React, { useState } from "react";
import { IPv4 } from "./lib/ipv4";
import "./IPv4Addr.css";

const IPv4Addr = (props) => {
  const [ipv4, setIpv4] = useState(new IPv4([10, 0, 8, 0], 21));
  const [validAddress, setValidAddress] = useState(true);
  const [showSubnetting, setShowSubnetting] = useState(true);
  const [subnetsNumber, setSubnetsNumber] = useState(0);

  const setOctet = (octet, index, change) => {
    let updatedAddress = [...ipv4.address];
    if (change) {
      updatedAddress[index] = +octet;
      setIpv4(new IPv4(updatedAddress, ipv4.mask));
    }
  };

  const setNetmask = (netmask, change) => {
    if (change) {
      setIpv4(new IPv4(ipv4.address, netmask));
    }
  };

  const setNumberOfSubnets = (subnetsNumber, change) => {
    if (change) {
      setSubnetsNumber(subnetsNumber);
    }
  };

  const displayNetmasks = (netmasks) => {
    let netmasksElements = [];
    netmasks.forEach((e, index) => {
      netmasksElements.push(
        <div key={`networkAddress-${index}`}>
          {e.networkAddress}/{e.netmask} ({e.count} hosts)
        </div>
      );
    });
    return netmasksElements;
  };

  return (
    <div>
      <div className="address-container">
        {ipv4.address.map((octet, index) => {
          return (
            <div className="octet-container" key={`oct-container-${index}`}>
              <Octet
                value={octet}
                index={index}
                setValid={setValidAddress}
                changeFunction={setOctet}
              />
              {index < 3 ? <span>.</span> : <span className="slash">/</span>}
            </div>
          );
        })}{" "}
        <Netmask
          value={ipv4.mask}
          setValid={setValidAddress}
          changeFunction={setNetmask}
        />
      </div>

      {validAddress ? (
        <div className="results">
          <div>
            <strong>Binary:</strong>
            <span>{ipv4.getBinnary()}</span>
          </div>
          <div>
            <strong>Network Address:</strong>
            <span>{ipv4.networkAddress()}</span>
          </div>
          <div>
            <strong>First usable address:</strong>
            <span>{ipv4.firstUsableAddress()}</span>
          </div>
          <div>
            <strong>First usable address(AWS):</strong>
            <span>{ipv4.firstUsableAddress(3)}</span>
            <br />
            <span>
              AWS reserves first four addresses for: Network, Router, DNS,
              Future use
            </span>
          </div>
          <div>
            <strong>Last usable address:</strong>
            <span>{ipv4.lastUsableAddress()}</span>
          </div>
          <div>
            <strong>Broadcast Address:</strong>
            <span>{ipv4.broadcastAddress()}</span>
          </div>
          <div>
            <strong>Netmask:</strong>
            <span>{ipv4.netmask()}</span>
          </div>
          <div>
            <strong>Count:</strong>
            <span>{ipv4.count()}</span>
          </div>
          <div>
            <strong>Usable addresses:</strong>
            <span>{ipv4.availableCount()}</span>
          </div>
          <div>
            <strong>Usable addresses(AWS):</strong>
            <span>{ipv4.availableCount(5)}</span>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="subnets">
        Break into subnets:
        <input
          name="showSubnetting"
          type="checkbox"
          checked={showSubnetting}
          onChange={(e) => {
            setShowSubnetting(e.target.checked);
          }}
        />
        <br />
        <br />
        {showSubnetting ? (
          <div id="details">
            max number of subnets: {ipv4.numberOfPossibleSubnets()} with a
            minimum of 4 addreses (minus Network, broadcast, 2 available
            addresses) closest: {ipv4.getClosestPowerOfTwo(subnetsNumber)}
            <div id="subnet-input-container">
              <SubnetNumbersInput
                value={subnetsNumber}
                onChange={setNumberOfSubnets}
                maxNumberOfSubnets={ipv4.numberOfPossibleSubnets()}
              />
              {displayNetmasks(ipv4.breakIntoSubnets(subnetsNumber))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default IPv4Addr;
