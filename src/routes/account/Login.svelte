<script>
    import GnbPublisher from '../../components/GnbPublisher.svelte';
</script>

<GnbPublisher />

<header class="bg_member">
   <h1><a href="/">weaponMasterr</a></h1>
   <h2>회원가입</h2>
</header>

<style>
   header {
       position: relative;
       width: 100%;
       height: 300px;
       overflow: hidden;
   }
   
   header.bg_member {
       background: url(https://resource.df.nexon.com/ui/img/mem/bg.png) no-repeat 50% 0;
   }

   header h1 a {
       display: block;
       margin: 53px auto 0 auto;
       width: 216px;
       height: 122px;
       background: url(https://resource.df.nexon.com/ui/img/mem/logo.png) no-repeat;
       font-size: 0;
   }

   a {
       text-decoration: none;
   }
   
   header h2 {
       margin-top: 0;
       margin-left: 11px;
       text-align: center;
       color: #fff;
       font-size: 40px;
       font-weight: 300;
       line-height: 54px;
   }
</style>