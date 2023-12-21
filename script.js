const { createApp } = Vue

createApp({
  data() {
    return {
      term: '',
      results: [],
      oldresutls: [],
      noResults: false,
      searching: false,
      input: "",
      search_api: "",
      objectOfAttrs: {
        class: 'result',
      },
      tab: [],
      data_count: 0,
      genre: [],
      search_num: 0,
      sortedgen: [],
      selected_genrelist: [],
      listedgen: [],
      is_blue: true,
      isClicked: [],
      allClicked: true,
      sortpri: [],
      sortpri_sort: [],
      sortpri_array: [],
      newarraypri: [],
      collectName: [],
      resetorgin: true,
      collectname_sort: false,
      pricesort: false,
      plsworknow: false,
      select_count: 0,
      song_play: [],
      audio_play: [],
      showall_button: false
    }
  },
  methods: {
    search: function (event) {
      //montiro the events that the person keys, that is the artist search 
      this.resetorgin = true;
      this.collectname_sort = false;
      this.pricesort = false;
      this.input = event.target.value;
      this.input = this.input.replace(/ /g, "+");
      console.log(this.input);
      this.search_api = 'https://itunes.apple.com/search?attribute=allArtistTerm&term=' + this.input;
      this.results = [];
      this.searching = true;
      fetch(this.search_api)
        .then(res => res.json())
        .then(res => {
          this.searching = false;
          console.log("res:", res);
          this.results = res.results;
          this.oldresutls = this.results;;
          this.search_num = res.resultCount;
          console.log(this.results);
          for (i = 0; i < this.search_num; i++) {
            this.tab.push(0);
            this.song_play.push(0);
          }
          this.genre = [];
          for (i = 0; i < this.search_num; i++) {
            this.genre.push(this.results[i].primaryGenreName);
          }
          this.sortedgen = new Set(this.genre);
          // this.selected_genrelist = [this.sortedgen];
          this.listedgen = Array.from(this.sortedgen);
          console.log((this.listedgen));
          for (i = 0; i < this.listedgen.length; i++) {
            this.selected_genrelist.push(0);
          }
          console.log(this.selected_genrelist);
          //PRICE SORT
          for (i = 0; i < this.search_num; i++) {
            this.sortpri.push(this.results[i].trackPrice);
          }
          //make a set for that array
          this.sortpri_sort = new Set(this.sortpri);
          //convert set back to an array 
          this.sortpri_array = Array.from(this.sortpri_sort);
          this.sortpri_array.sort();
          console.log(this.sortpri_array);
          this.newarraypri = this.results;


          //COLLECTION NAME SORT
          for (i = 0; i < this.search_num; i++) {
            this.collectName.push(this.results[i].collectionName);
          }
          this.collectName.sort();

          //audio
          for (let i = 0; i < this.search_num; i++) {
            var music = new Audio();
            music.src = this.results[i].previewUrl;
            this.audio_play.push(music);
          }
          console.log(this.audio_play);
          this.showall_button = true;
        })
    },
    changeTab: function (index) {
      //how can u get access to the idex
      //fill the tab with 50 zeros
      console.log(this.tab);
      this.tab[index] = 0;
    },
    changeTab1: function (index) {
      this.tab[index] = 1;
      console.log(this.tab);
    },
    sort_price: function (event) {
      this.resetorgin = false;
      this.pricesort = true;
      this.collectname_sort = false;
      if (this.plsworknow == true) {
        this.results = [];
        for (let i = 0; i < this.selected_genrelist.length; i++) {
          if (this.selected_genrelist[i] == 1) {
            for (let j = 0; j < this.oldresutls.length; j++) {
              if ((this.listedgen[i] == this.oldresutls[j].primaryGenreName)) {
                this.results.push(this.oldresutls[j]);
              }
            }
          }
        }
      }
      else {
        this.results = [];
        for (let i = 0; i < this.oldresutls.length; i++) {
          this.results.push(this.oldresutls[i]);
        }
      }
      console.log(this.result);
      this.newarraypri = this.results;
      this.results = [];
      for (let i = 0; i < this.sortpri_array.length; i++) {
        for (let j = 0; j < this.newarraypri.length; j++) {
          if ((this.sortpri_array[i] == this.newarraypri[j].trackPrice)) {
            this.results.push(this.newarraypri[j]);
          }
        }
      }
      console.log(this.results);
    },
    sort_name: function (event) {
      this.resetorgin = false;
      this.pricesort = false;
      this.collectname_sort = true;

      if (this.plsworknow == true) {
        this.results = [];
        for (let i = 0; i < this.selected_genrelist.length; i++) {
          if (this.selected_genrelist[i] == 1) {
            for (let j = 0; j < this.oldresutls.length; j++) {
              if ((this.listedgen[i] == this.oldresutls[j].primaryGenreName)) {
                this.results.push(this.oldresutls[j]);
              }
            }
          }
        }
      }
      else {
        this.results = [];
        for (let i = 0; i < this.oldresutls.length; i++) {
          this.results.push(this.oldresutls[i]);
        }
      }
      this.newarraypri = this.results;
      this.results = [];
      for (let i = 0; i < this.collectName.length; i++) {
        for (let j = 0; j < this.newarraypri.length; j++) {
          if ((this.collectName[i] == this.newarraypri[j].collectionName)) {
            this.results.push(this.newarraypri[j]);
          }
        }
      }
    },
    reset_orgi: function (event) {
      this.resetorgin = true;
      this.pricesort = false;
      this.collectname_sort = false;
      this.results = this.newarraypri;
      this.results = [];
      if (this.plsworknow == true) {
        this.results = [];
        for (let i = 0; i < this.selected_genrelist.length; i++) {
          if (this.selected_genrelist[i] == 1) {
            for (let j = 0; j < this.oldresutls.length; j++) {
              if ((this.listedgen[i] == this.oldresutls[j].primaryGenreName)) {
                this.results.push(this.oldresutls[j]);
              }
            }
          }
        }
      }
      else {
        this.results = [];
        for (let i = 0; i < this.oldresutls.length; i++) {
          this.results.push(this.oldresutls[i]);
        }
      }
    },
    //need to list with
    sortgen: function (index) {
      // can do an array of zeros 
      this.allClicked = false;
      this.plsworknow = true;
      console.log(this.allClicked);
      if (this.isClicked[index] == true) {
        this.isClicked[index] = false;
      }
      else {
        this.isClicked[index] = true;
      }
      if (this.selected_genrelist[index] == 0) {
        this.selected_genrelist[index] = 1;
      }
      else {
        this.selected_genrelist[index] = 0;
      }
      console.log(this.selected_genrelist);
      // console.log((this.selected_genrelist));
      //keep track if each individual cgenre is clicked- array of genres/indices 
      //bool for each genre, if its already clicked set it true
      //new arrays to keep track if something is click on not
      this.results = [];

      for (let i = 0; i < this.selected_genrelist.length; i++) {
        if (this.selected_genrelist[i] == 1) {
          for (let j = 0; j < this.oldresutls.length; j++) {
            if ((this.listedgen[i] == this.oldresutls[j].primaryGenreName)) {
              this.results.push(this.oldresutls[j]);
            }
          }
        }
      }
      if (this.pricesort == true) {
        this.results = [];
        for (let i = 0; i < this.selected_genrelist.length; i++) {
          if (this.selected_genrelist[i] == 1) {
            for (let j = 0; j < this.oldresutls.length; j++) {
              if ((this.listedgen[i] == this.oldresutls[j].primaryGenreName)) {
                this.results.push(this.oldresutls[j]);
              }
            }
          }
        }
        console.log(this.result);
        this.newarraypri = this.results;
        this.results = [];
        for (let i = 0; i < this.sortpri_array.length; i++) {
          for (let j = 0; j < this.newarraypri.length; j++) {
            if ((this.sortpri_array[i] == this.newarraypri[j].trackPrice)) {
              this.results.push(this.newarraypri[j]);
            }
          }
        }
        console.log(this.results);
      }
      /*f(this.collectname_sort===true){
           this.results=[];
           for (let i = 0; i < this.selected_genrelist.length; i++) {
             if (this.selected_genrelist[i] == 1) {
               for (let j = 0; j < this.oldresutls.length; j++) {
                 if ((this.listedgen[i] == this.oldresutls[j].primaryGenreName)) {
                   this.results.push(this.oldresutls[j]);
                 }
               }
             }
           }
         this.newarraypri=[];
         console.log(this.newarraypri);
         console.log(this.results);
         this.newarraypri = this.results;
         console.log(this.newarraypri);
         this.results = [];
         console.log(this.results);
         this.results = [];
         for (let i = 0; i < this.collectName.length; i++) {
           for (let j = 0; j < this.newarraypri.length; j++) {
             if ((this.collectName[i] == this.newarraypri[j].collectionName)) {
               this.results.push(this.newarraypri[j]);
             }
           }
         }
         console.log(this.results.length);
         console.log(this.results);
       }*/
      this.search_num = this.results.length;
    },
    all_show: function (event) {
      this.allClicked = true;
      this.plsworknow = false;
      //for loop of isClicked 
      console.log(this.allClicked);
      this.results = this.oldresutls;
      this.search_num = this.results.length;
      this.selected_genrelist = [];
      for (i = 0; i < this.listedgen.length; i++) {
        this.selected_genrelist.push(0);
        this.isClicked[i] = false;
      }
    },
    play_music: function (index) {
      this.audio_play[index].play();
      this.song_play[index] = 1;
    },
    pause_music: function (index) {
      this.audio_play[index].pause();
      this.song_play[index] = 0;
    }
  }
}).mount('#app') // this should be the last thing in your code, not allowed to do any CSS only bootstrap
