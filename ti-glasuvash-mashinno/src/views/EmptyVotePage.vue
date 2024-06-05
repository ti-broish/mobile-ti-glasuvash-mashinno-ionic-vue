<template>
    <ion-page>
        <ion-content ref="content">
            <div class="container">
                <div class="previewContainer">
                    <div class="previewSectionContainer">
                        <ion-label class="previewSection">{{ emptyVoteTitle }}</ion-label>
                    </div>
                    <div class="previewSeparator"></div>
                    <br><br>
                    <div class="previewSectionContainer">
                        <ion-label class="previewSection">{{ emptyVoteText }}</ion-label>
                    </div>
                    <div class="pageFooter">
                        <ion-button class="doneButton" @click="didPressDone()">{{
                            doneButton }}</ion-button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonContent, IonPage, IonLabel, IonButton } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { EmptyVotePageStrings } from "@/utils/LocalizedStrings";

export default defineComponent({
    name: "EmptyVote-Component",
    components: {
        IonContent,
        IonPage,
        IonLabel,
        IonButton,
    },
    setup() {
        const router = useRouter();
        const content = ref();

        const scrollToBottom = () => {
            content.value.$el.scrollToBottom(300);
        };

        return { router, content, scrollToBottom };
    },
    data() {
        return {
            emptyVoteTitle: EmptyVotePageStrings.title,
            emptyVoteText: EmptyVotePageStrings.text,
            doneButton: EmptyVotePageStrings.doneButton,
        };
    },
    methods: {
        didPressDone() {
            this.$router.go(-1);
        },
    },
});
</script>
  
<style scoped>
.container {
    margin: 8px;
    padding-top: max(var(--ion-safe-area-top), 22px);
}

.previewContainer {
    margin: 16px auto;
    border: 4px solid var(--tigm-border-color);
    border-radius: 8px;
}

.previewSection {
    font-size: 16px;
    font-weight: bold;
}

.previewSectionContainer {
    margin: 16px auto;
    text-align: center;
}

.previewSeparator {
    margin-left: 24px;
    margin-right: 24px;
    border: 2px solid var(--tigm-border-color);
}

.pageFooter {
    height: 100px;
    margin-right: 16px;
    margin-bottom: 16px;
}

.doneButton {
    float: right;
    margin-top: 60px;
    margin-right: 8px;
    --background: var(--tigm-button-background-color);
    --background-activated: var(--tigm-button-activated-color);
    --color: white;
    text-transform: none;
    font-size: 16px;
    min-width: 160px;
    width: 160px;
    min-height: 35px;
    height: 35px;
}
</style>