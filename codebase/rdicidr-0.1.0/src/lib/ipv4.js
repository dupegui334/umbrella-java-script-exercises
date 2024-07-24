class IPv4 {
  constructor(address, mask) {
    this.address = address;
    this.mask = parseInt(mask);
    this.fullAddress = "";
    this.reserved = 2;
  }

  setReserved(reserved) {
    this.reserved = reserved;
  }

  setSubnetMask(mask) {
    this.mask = mask;
    this.fullAddress = "";
  }

  setOctet(octet, index) {
    this.address[index] = octet;
    this.fullAddress = "";
  }

  getBinnary() {
    return this.address
      .map((octet, index) => {
        return octet.toString(2).padStart(8, "0");
      })
      .join(".");
  }

  getOnlyBinnary() {
    return this.address
      .map((octet, index) => {
        return octet.toString(2).padStart(8, "0");
      })
      .join("");
  }

  getFullAddress() {
    if (this.fullAddress !== "") {
      return this.fullAddress;
    }
    this.fullAddress = parseInt(
      this.getBinnary().replace(/\./g, "").padStart(32, "0"),
      2
    );
    return this.fullAddress;
  }

  networkAddress() {
    const fullAddress = this.getFullAddress();
    const netmask = parseInt(
      ((1 << (32 - this.mask)) >>> 0).toString(2).padStart(32, "1"),
      2
    );
    const networkAddress = ((fullAddress & netmask) >>> 0)
      .toString(2)
      .padStart(32, "0")
      .match(/.{1,8}/g);

    const intNetWorkAddress = networkAddress.map((octet) => {
      return parseInt(octet, 2);
    });
    return intNetWorkAddress.join(".");
  }

  firstUsableAddress(reserved = 0) {
    const fullAddress = this.getFullAddress();
    const netmask = parseInt(
      ((1 << (32 - this.mask)) >>> 0).toString(2).padStart(32, "1"),
      2
    );
    const firstAddress = (((fullAddress & netmask) + 1 + reserved) >>> 0)
      .toString(2)
      .padStart(32, "0")
      .match(/.{1,8}/g);

    const intFirstAddress = firstAddress.map((octet) => {
      return parseInt(octet, 2);
    });
    return intFirstAddress.join(".");
  }

  lastUsableAddress() {
    const fullAddress = this.getFullAddress();
    const netmask = parseInt(
      (1 << (32 - this.mask)).toString(2).padStart(32, "1"),
      2
    );
    const broadcast = ~(netmask >>> 0);
    const lastAddress = (((fullAddress | broadcast) >>> 0) - 1)
      .toString(2)
      .padStart(32, "0")
      .match(/.{1,8}/g);

    const intLastAddress = lastAddress.map((octet) => {
      return parseInt(octet, 2);
    });
    return intLastAddress.join(".");
  }

  broadcastAddress() {
    const fullAddress = this.getFullAddress();
    const netmask = parseInt(
      (1 << (32 - this.mask)).toString(2).padStart(32, "1"),
      2
    );
    const broadcast = ~(netmask >>> 0);
    const broadcastAddress = ((fullAddress | broadcast) >>> 0)
      .toString(2)
      .padStart(32, "0")
      .match(/.{1,8}/g);

    const intBroadcastAddress = broadcastAddress.map((octet) => {
      return parseInt(octet, 2);
    });
    return intBroadcastAddress.join(".");
  }

  netmask() {
    const netmask = parseInt(
      (1 << (32 - this.mask)).toString(2).padStart(32, "1"),
      2
    );
    const netmaskOctets = netmask
      .toString(2)
      .padStart(32, "0")
      .match(/.{1,8}/g);

    const intNetmask = netmaskOctets.map((octet) => {
      return parseInt(octet, 2);
    });
    return intNetmask.join(".");
  }

  count() {
    const count = parseInt((1 << (32 - this.mask)).toString(2), 2);
    return count;
  }

  availableCount(reserved = this.reserved) {
    return this.count() - reserved;
  }

  getClosestPowerOfTwo(number) {
    let strNumber = (+number).toString(2);
    let len = strNumber.length;
    let masking = parseInt(strNumber.substring(1), 2) >>> 0;
    if (masking > 0) {
      return (1 << len) >>> 0;
    }
    return number;
  }

  breakIntoSubnets(number) {
    if (this.numberOfPossibleSubnets < number || number <= 0) {
      return [`Can't break into ${number} subnets`];
    }
    let subnets = [];
    let closestNumber = +this.getClosestPowerOfTwo(number); //e.g. 8 - 1000
    let len = (+closestNumber).toString(2).length - 1; // to get the max number of elements for the next power of two.
    let additionalMask =
      (parseInt("1".repeat(len), 2) << (32 - this.mask - len)) >>> 0; // e.g. 111 if we have number be 8
    const netmask = parseInt(
      (1 << (32 - this.mask)).toString(2).padStart(32, "1"),
      2
    ); // the current netmask in binary
    const newNetmask = this.mask + len;
    let maxNetmask = (netmask | additionalMask) >>> 0;
    let currentSubnet = netmask;
    let currentOctets = this.address;
    while (currentSubnet <= maxNetmask) {
      let currIpv4 = new IPv4(currentOctets, newNetmask);
      subnets.push({
        networkAddress: currIpv4.networkAddress(),
        netmask: newNetmask,
        count: currIpv4.count(),
      });
      currentSubnet += currIpv4.count();
      const nextSubnet =
        parseInt(currIpv4.getOnlyBinnary(), 2) + currIpv4.count();
      const strCurrentOctets = nextSubnet
        .toString(2)
        .padStart(32, "0")
        .match(/.{1,8}/g);
      currentOctets = strCurrentOctets.map((octet) => {
        return parseInt(octet, 2);
      });
    }
    return subnets;
  }

  numberOfPossibleSubnets() {
    return 2 ** (30 - this.mask);
  }
}

export { IPv4 };
