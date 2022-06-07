# 1. Hook - useState ?

- useState là 1 hook cho phép chúng ta quản lý State trong functional component.
- const [state, setState] = useState(defaultState)

* state: giá trị mặc định của State
* setState là function dùng để cập nhập State
* defaultState là giá trị mặc định của State khi được khởi tạo.

- const testState = () => {
  const defaultState = 1 \* 2
  const [state, setState] = useState(defaultState)

      return ()

  }

- Luồng:

* Mỗi lần testState được gọi, thì sẽ khai báo 1 biến tên là defaultState, khi state thay đổi thì const defaultState sẽ được tính toán lại.
* Ở đây để xử lý tình trạng này, ta xử lý như sau:

- const testState = () => {
  const [state, setState] = useState(() => {
  const defaultState = 1 \* 2

        return defaultState

  }))

  return ()

  }

- Trạng thái:

* 
