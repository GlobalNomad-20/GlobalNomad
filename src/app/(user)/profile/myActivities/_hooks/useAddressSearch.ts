interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: "R" | "J"; // R: 도로명, J: 지번
}

interface DaumPostcode {
  new (options: {
    oncomplete: (data: DaumPostcodeData) => void;
    onclose?: () => void;
    width?: string | number;
    height?: string | number;
  }): {
    open: () => void;
  };
}

declare global {
  interface Window {
    daum?: {
      Postcode: DaumPostcode;
    };
  }
}

export const useAddressSearch = () => {
  const openAddressSearch = (onComplete: (address: string) => void) => {
    if (!window.daum?.Postcode) {
      console.error("주소 서비스가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        let fullAddress = "";

        if (data.userSelectedType === "R") {
          fullAddress = data.roadAddress;
        } else {
          fullAddress = data.jibunAddress;
        }

        if (!fullAddress) {
          fullAddress = data.address;
        }

        onComplete(fullAddress);
      },
    }).open();
  };

  return { openAddressSearch };
};
