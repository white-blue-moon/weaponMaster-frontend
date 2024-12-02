  <script>
    // TODO
  </script>
  
  <header>
    <div class="logo">
      <img src="https://rs.nxfs.nexon.com/bannerusr/24/3/fvfQ21143034203.gif" alt="Logo">
    </div>
    <nav>
      <ul>
        <li><a href="/">홈</a></li>
        <li><a href="/about">소개</a></li>
        <li><a href="/contact">문의</a></li>
      </ul>
    </nav>
  </header>
  
  <style>
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #333;
      color: white;
    }
  
    .logo {
    position: absolute;  /* 로고를 가운데로 위치 */
    left: 50%;
    transform: translateX(-50%);  /* 왼쪽에서 50%만큼 이동시켜 정확히 가운데에 위치 */
  }
  
    nav ul {
      display: flex;
      list-style: none;
    }
  
    nav li {
      margin: 0 15px;
    }
  
    nav a {
      color: white;
      text-decoration: none;
    }
  
    nav a:hover {
      text-decoration: underline;
    }
  </style>
  