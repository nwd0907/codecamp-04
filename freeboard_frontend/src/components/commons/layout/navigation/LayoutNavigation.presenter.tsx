import { MenuItem, Wrapper } from "./LayoutNavigation.styles";
import { ILayoutNavigationUIProps } from "./LayoutNavigation.types";

export default function LayoutNavigationUI(props: ILayoutNavigationUIProps) {
  return (
    <Wrapper>
      <MenuItem id="/myfirebase" onClick={props.onClickMenu}>
        파이어베이스실습
      </MenuItem>
      <>|</>
      <MenuItem id="/openapis" onClick={props.onClickMenu}>
        라이브강아지
      </MenuItem>
      <>|</>
      <MenuItem id="/boards" onClick={props.onClickMenu}>
        라이브게시판
      </MenuItem>
      <>|</>
      <MenuItem id="/markets" onClick={props.onClickMenu}>
        라이브상품
      </MenuItem>
      <>|</>
      <MenuItem id="/mypages" onClick={props.onClickMenu}>
        마이페이지
      </MenuItem>
    </Wrapper>
  );
}
